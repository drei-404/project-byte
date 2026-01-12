"use client";

import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import createNews from "@/actions/actions";
import { useState } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsPostForm({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { id: "1" },
  });

  const [author, setAuthor] = useState(user?.id || "")


  return (
    <>
    <div className="flex justify-center mt-20">
        <div className="w-full max-w-md">
          <form action={createNews}>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>News Post</FieldLegend>
                <FieldDescription>Post an article for BYTE</FieldDescription>
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
                      value={author}
                      name="author"
                      placeholder="Author"
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
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
      </div></>
  )
}
