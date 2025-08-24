import React, { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useFindDriverMutation } from "@/redux/features/rider/rider.api";
import { useGetDriversQuery } from "@/redux/features/driver/driver.api";
import type { Driver, DriverQueryResult, FindDriverApiResponse, FindDriverPayload, GetDriversApiResponse, IError, SelectingMode } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { LocationCoords } from '@/components/modules/dashboard/Rider/MapComponent';
import MapComponent from '@/components/modules/dashboard/Rider/MapComponent';
import NotFound from '@/components/modules/dashboard/Rider/NotFound';
import Loading from '@/components/modules/dashboard/Rider/Loading';
import SelectionStatus from '@/components/modules/dashboard/Rider/SelectionStatus';
import { LocationDisplay } from '@/components/modules/dashboard/Rider/LoactionDisplay';
import { AvailableDriversPanel } from '@/components/modules/dashboard/Rider/AvaiableDriverTable';
import { calculateDistance } from '@/utils/calculateDistance';
import FindError from '@/components/modules/dashboard/Rider/FindError';
import GettingStarted from '@/components/modules/dashboard/Rider/GettingStarted';
import { RiderActionButton } from '@/components/modules/dashboard/Rider/RiderActionButton';
import RiderHeader from '@/components/modules/dashboard/Rider/RiderHeader';


const FindDriverMap: React.FC = () => {
  const [pickupLocation, setPickupLocation] = useState<LocationCoords | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<LocationCoords | null>(null);
  const [selecting, setSelecting] = useState<SelectingMode>("pickup");
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);

  const [findDriver, { isLoading }] = useFindDriverMutation();
  const {
    data: driversData,
    isLoading: dLoading,
    error: dError,
    refetch: refetchDrivers
  } = useGetDriversQuery(undefined) as DriverQueryResult;



  const allDrivers = useMemo(() => {
    const data = driversData as GetDriversApiResponse;
    return data?.drivers || data?.data?.drivers || [];
  }, [driversData]);

  const canSearch = useMemo(() => {
    return !!(pickupLocation && destinationLocation && !isLoading);
  }, [pickupLocation, destinationLocation, isLoading]);


  const handleFind = useCallback(async (): Promise<void> => {
    if (!pickupLocation || !destinationLocation) {
      toast.warning("Please select both pickup and destination points.");
      return;
    }

    const payload: FindDriverPayload = {
      pickupLocation: {
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
        address: "Pickup Location",
      },
      destinationLocation: {
        lat: destinationLocation.lat,
        lng: destinationLocation.lng,
        address: "Destination Location",
      },
    };

    try {
      const response = await findDriver(payload).unwrap() as FindDriverApiResponse;

      const foundDrivers = response?.data?.driver ||
        response?.data?.drivers ||
        [];

      // Calculate distances for found drivers
      if (foundDrivers.length > 0) {
        const driversWithDistance = foundDrivers.map((driver: Driver) => {
          let distance = 0;

          const [lng, lat] = driver.location.coordinates;

          if (lat && lng) {
            distance = calculateDistance(
              pickupLocation.lat,
              pickupLocation.lng,
              lat,
              lng
            );
          }

          return { ...driver, distance };
        });
        console.log(driversWithDistance)

        setAvailableDrivers(driversWithDistance);
        toast.success(`Found ${foundDrivers.length} nearby driver(s)!`);
      } else {
        setAvailableDrivers([]);
        toast.warning("No drivers available in this area.");
      }

    } catch (err) {
      const error = err as IError;
      setAvailableDrivers([]);

      if (error.status === 404) {
        toast.error("No nearby drivers available.");
      } else if (error.status === 400) {
        toast.error("Invalid location selected. Please try again.");
      } else {
        toast.error("Failed to find drivers. Please try again.");
      }
    }
  }, [pickupLocation, destinationLocation, findDriver]);

  const handleLocationSelect = useCallback(({ lat, lng }: LocationCoords): void => {
    if (selecting === "pickup") {
      setPickupLocation({ lat, lng });
      toast.success("📍 Pickup location selected!");
      setSelecting("destination");
    } else {
      setDestinationLocation({ lat, lng });
      toast.success("🏁 Destination location selected!");
    }
  }, [selecting]);

  const handleDriverClick = useCallback((driver: Driver): void => {
    console.log(driver)

    toast.info(`🚗 Driver: ${driver.name || "Unknown"} clicked! Check console for details.`);
  }, []);

  const handleAssignDriver = useCallback((driver: Driver): void => {
    console.log(driver, pickupLocation, destinationLocation)
    toast.success(
      `✅ Driver ${driver.name || "Unknown"} assigned successfully!`,
      {
        description: `Phone: ${driver.phone || "N/A"} | Vehicle: ${driver.vehicleInfo?.type || "N/A"}`
      }
    );
  }, [pickupLocation, destinationLocation]);

  const handleViewDriverDetails = useCallback((driver: Driver): void => {
    handleDriverClick(driver);
    console.log()
  }, [handleDriverClick]);

  const handleReset = useCallback((): void => {
    setPickupLocation(null);
    setDestinationLocation(null);
    setAvailableDrivers([]);
    setSelecting("pickup");
    toast.info("🔄 Locations and search results cleared!");
  }, []);

  const handleRefreshDrivers = useCallback((): void => {
    if (refetchDrivers) {
      refetchDrivers();
      toast.info("🔄 Refreshing driver list...");
    }
  }, [refetchDrivers]);


  if (dLoading) {
    return <Loading />
  }


  return (
    <Card className="w-full max-w-6xl mx-auto shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-primary/100 to-primary/60 text-white rounded-lg py-4">
        <RiderHeader handleRefreshDrivers={handleRefreshDrivers} />
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Control Buttons */}
        <RiderActionButton
          selecting={selecting}
          setSelecting={setSelecting}
          pickupLocation={pickupLocation}
          destinationLocation={destinationLocation}
          handleReset={handleReset}
          handleFind={handleFind}
          isLoading={isLoading}
          canSearch={canSearch}
        />

        {/* Selection Status */}
        {availableDrivers.length === 0 && <SelectionStatus selecting={selecting} />}

        {/* Location Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LocationDisplay location={pickupLocation} type="pickup" />
          <LocationDisplay location={destinationLocation} type="destination" />
        </div>

        {/* Available Drivers Table */}
        {availableDrivers.length > 0 ? (
          <>
            <AvailableDriversPanel availableDrivers={availableDrivers} handleAssignDriver={handleAssignDriver} handleViewDriverDetails={handleViewDriverDetails} />

          </>
        ) : (
          <>
            {/* Map Section */}
            <MapComponent
              center={[23.8103, 90.4125]}
              zoom={12}
              height="400px"
              pickupLocation={pickupLocation}
              destinationLocation={destinationLocation}
              allDrivers={allDrivers}
              nearbyDrivers={availableDrivers}
              onLocationSelect={handleLocationSelect}
              onDriverClick={handleDriverClick}
              className="shadow-lg"
            />
          </>
        )}

        {/* No Drivers Found Message */}
        {availableDrivers.length === 0 && pickupLocation && destinationLocation && !isLoading && (
          <NotFound
            handleFind={handleFind}
            handleReset={handleReset}
            isLoading={isLoading}
          />

        )}

        {/* Getting Started Message */}
        {!pickupLocation && !destinationLocation && (
          <GettingStarted setSelecting={setSelecting} />
        )}

        {/* Error Messages */}
        {dError && (
          <FindError />
        )}

      </CardContent>
    </Card >
  );
};

export default FindDriverMap;
export type {
  FindDriverPayload,
  FindDriverApiResponse,
  GetDriversApiResponse,
  SelectingMode
};