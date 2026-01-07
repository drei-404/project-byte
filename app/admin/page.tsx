import prisma from "@/lib/db";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { div } from "motion/react-client";
import createNews from "@/actions/actions";

type PageProps = {
  params: Promise<{ id: string }>
}


export default async function AdminPage({ params }: PageProps) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id: "1" },
  });

  return (
    <div className="flex justify-center">
    <div className="w-full max-w-md">
      <form action={createNews}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>News Post</FieldLegend>
            <FieldDescription>
              Post an article for BYTE
            </FieldDescription>
          {/* ------------- Title ------------- */}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                   News Title
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  name="title"
                  placeholder="Title"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet className="">
          {/* ------------- Author ------------- */}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                   Author
                </FieldLabel>
                <Input
                  value={user?.id}
                  name="author"
                  placeholder="Author"
                  required
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  name="publish"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
          {/* ------------- Content ------------- */}

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Content
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  name="content"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
    </div>
  )
}


