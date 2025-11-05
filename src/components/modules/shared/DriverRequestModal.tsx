import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { CarFront, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const vehicleInfoSchema = z.object({
  type: z.enum(['car', 'bike']),
  model: z.string().min(1, 'Vehicle model is required'),
  plateNumber: z.string().min(1, 'Plate number is required')
});

const driverExtensionSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  vehicleInfo: vehicleInfoSchema,
  isAvailable: z.boolean().optional()
});

type DriverExtensionFormData = z.infer<typeof driverExtensionSchema>;

export function DriverRegistrationModal({
  open,
  onClose,
  onSubmit,
  isLoading = false
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DriverExtensionFormData) => void;
  isLoading?: boolean;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<DriverExtensionFormData>({
    resolver: zodResolver(driverExtensionSchema),
    defaultValues: {
      licenseNumber: '',
      vehicleInfo: {
        type: undefined,
        model: '',
        plateNumber: ''
      },
      isAvailable: true
    }
  });

  const values = watch();


  const submitHandler = (data: DriverExtensionFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CarFront className="h-5 w-5" />
            Driver Registration
          </DialogTitle>
          <DialogDescription>
            Complete your driver registration to start accepting rides.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          {/* License Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">License Number</label>
            <Input
              placeholder="DL-123456"
              {...register('licenseNumber')}
              value={values.licenseNumber}
              onChange={(e) => setValue('licenseNumber', e.target.value.toUpperCase())}
              className={`uppercase ${errors.licenseNumber ? 'border-red-500' : ''}`}
            />
            {errors.licenseNumber && (
              <p className="text-sm text-red-500">{errors.licenseNumber.message}</p>
            )}
          </div>

          {/* Vehicle Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle Type</label>
            <Select
              value={values.vehicleInfo.type}
              onValueChange={(value) => setValue('vehicleInfo.type', value as DriverExtensionFormData['vehicleInfo']['type'])}
            >
              <SelectTrigger className={errors.vehicleInfo?.type ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="van">Van</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
            {errors.vehicleInfo?.type && (
              <p className="text-sm text-red-500">{errors.vehicleInfo.type.message}</p>
            )}
          </div>

          {/* Vehicle Model */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Vehicle Model</label>
            <Input
              placeholder="Toyota Camry"
              {...register('vehicleInfo.model')}
              value={values.vehicleInfo.model}
              onChange={(e) => setValue('vehicleInfo.model', e.target.value)}
              className={errors.vehicleInfo?.model ? 'border-red-500' : ''}
            />
            {errors.vehicleInfo?.model && (
              <p className="text-sm text-red-500">{errors.vehicleInfo.model.message}</p>
            )}
          </div>

          {/* Plate Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Plate Number</label>
            <Input
              placeholder="ABC-1234"
              {...register('vehicleInfo.plateNumber')}
              value={values.vehicleInfo.plateNumber}
              onChange={(e) =>
                setValue('vehicleInfo.plateNumber', e.target.value.toUpperCase())
              }
              className={`uppercase ${errors.vehicleInfo?.plateNumber ? 'border-red-500' : ''}`}
            />
            {errors.vehicleInfo?.plateNumber && (
              <p className="text-sm text-red-500">{errors.vehicleInfo.plateNumber.message}</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="available"
              checked={values.isAvailable}
              onCheckedChange={(checked) => setValue('isAvailable', !!checked)}
            />
            <label htmlFor="available" className="text-sm font-medium">
              Available for rides immediately
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register as Driver'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}