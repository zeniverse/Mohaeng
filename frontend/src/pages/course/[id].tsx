import { useRouter } from "next/router";

export default function CourseDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>{`Course ${id}`}</h1>
    </div>
  );
}
