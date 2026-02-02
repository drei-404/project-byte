import { updateOrganization } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/contexts/toast-context";
import React from "react";

export type Organization = {
  id: string;
  name: string;
  location: string;
  trainingStartedAt: string;
};

export default function UpdateOrgForm({ org }: { org: Organization }) {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    try {
      await updateOrganization(formData);
      toast.success("User updated successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update user");
    }
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Update
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <form action={handleSubmit}>
            <input type="hidden" name="id" defaultValue={org.id} />

            <DialogHeader>
              <DialogTitle>Update User</DialogTitle>
              <Separator />

              <DialogDescription className="font-medium text-foreground">
                Organization Name
              </DialogDescription>
              <Input
                id="name"
                name="name"
                defaultValue={org.name}
                placeholder="Organization Name"
              />

              <DialogDescription className="font-medium text-foreground">
                Location
              </DialogDescription>
              <Input
                id="location"
                name="location"
                defaultValue={org.location}
                placeholder="Location"
              />

              <DialogDescription className="font-medium text-foreground">
                Joined At
              </DialogDescription>

              <Field className="mx-auto mb-4">
                <Popover >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="joined"
                      name="joined"
                      className="justify-start font-normal bg-muted"
                      disabled
                    >
                      <input
                        type="hidden"
                        name="joined"
                        value={org.trainingStartedAt}
                      />
                      {org.trainingStartedAt}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >

                  </PopoverContent>
                </Popover>
              </Field>

              <div className="relative flex justify-end gap-4">
                <Button type="submit">
                  <span>Save Changes</span>
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </div>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
