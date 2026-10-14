import PostCard from "@/components/blog/post-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog/posts";
import { Reveal } from "@/components/reveal";

export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section
      id="latest-posts"
      aria-labelledby="latest-posts-title"
      className="bg-surface scroll-mt-16 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="From the blog"
            id="latest-posts-title"
            title="Latest from the lab"
          />
          <ButtonLink
            href="/blog"
            variant="outline"
            arrow
            className="self-start sm:self-auto"
          >
            View all articles
          </ButtonLink>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal as="li" index={index} key={post.slug}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
