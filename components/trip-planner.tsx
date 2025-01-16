"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { saveTrip } from "@/lib/trips";
import { ItineraryMap } from "@/components/itinerary-map";
import { SaveTripButton } from "@/components/save-trip-button";

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  duration: z.string(),
  travelStyle: z.string(),
  budget: z.number().min(1),
  interests: z.string(),
});

export function TripPlanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<any[]>([]);
  const [generatedTrip, setGeneratedTrip] = useState<any>(null);
  const router = useRouter();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      duration: "7",
      travelStyle: "balanced",
      budget: 3,
      interests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to generate itinerary");

      const data = await response.json();

      // Convert itinerary locations to map format
      const mapLocations = data.itinerary.days.map(
        (day: any, index: number) => ({
          name: day.title,
          address: day.location,
          lat: day.coordinates.lat,
          lng: day.coordinates.lng,
          day: index + 1,
        }),
      );

      setLocations(mapLocations);
      setGeneratedTrip({
        ...values,
        itinerary: data.itinerary,
      });

      if (user) {
        await saveTrip({
          userId: user.uid,
          ...values,
          itinerary: data.itinerary,
        });
      }

      router.push(`/itineraries/${data.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Paris, France" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the city or country you want to visit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (days)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[3, 5, 7, 10, 14].map((days) => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Travel Style</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your travel style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="relaxed">Relaxed & Easy</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="active">Active & Adventurous</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget Level</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <FormDescription>
                  1 = Budget friendly, 5 = Luxury
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Interests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., art museums, local cuisine, hiking, photography..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Tell us about your interests to personalize your itinerary
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating Itinerary..." : "Generate Itinerary"}
          </Button>
        </form>
      </Form>

      {locations.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Itinerary</h2>
            {generatedTrip && <SaveTripButton tripData={generatedTrip} />}
          </div>
          <ItineraryMap locations={locations} />
        </div>
      )}
    </div>
  );
}
