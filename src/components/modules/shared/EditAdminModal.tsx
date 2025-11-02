/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export function AdminEditModal({ open, onClose, onSubmit, adminData, isLoading }: any) {
  const [formData, setFormData] = useState(adminData || {});

  useEffect(() => {
    setFormData(adminData || {});
  }, [adminData]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Admin Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Admin Name"
          />
          <Input
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Phone Number"
          />

        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(formData)} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}