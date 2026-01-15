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
import { DataTable } from "./data-table";
import { columns } from "./columns";

type PageProps = {
  params: Promise<{ id: string }>;
};

type NewsPostRow = {
  title: string
  status: boolean
  createdAt: string
  updatedAt: string
}

export default async function NewsPost({ params }: PageProps) {
  const user = await prisma.user.findUnique({
    where: { id: "1" },
  });

  const news = await prisma.newsPost.findMany({
    orderBy: { createdAt: "desc" },
  })

  const data: NewsPostRow[] = news.map(news => ({
    title: news.title,
    status: news.status,
    createdAt: news.createdAt.toISOString(),
    updatedAt: news.updatedAt.toISOString(),
  }))



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
                      value={1}
                      name="author"
                      placeholder="Author"
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
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
