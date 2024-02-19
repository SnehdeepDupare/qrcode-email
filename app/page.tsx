import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-blue-50 h-screen ">
      <h2 className="font-bold text-3xl">Contact Form</h2>
      <ContactForm />
    </main>
  );
}
