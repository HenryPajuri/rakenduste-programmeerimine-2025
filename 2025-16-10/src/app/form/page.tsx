import UserForm from "@/components/forms/UserForm";

export default function FormPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">User Registration</h1>
        <UserForm />
      </div>
    </div>
  );
}
