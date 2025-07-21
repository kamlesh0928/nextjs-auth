export default function UserProfilePage({ params }: any) {
  return (
    <div className="h-screen flex justify-center items-center">
      <h1 className="text-4xl font-bold">
        Welcome <span className="text-blue-500 italic">{params.id}</span>
      </h1>
    </div>
  );
}
