"use client";
import { Note } from "@/types/notes";
import NoteEditor from "@/components/notes/NoteEditor";
import { $selectedNote } from "@/store/notes";
import { useStore } from "@nanostores/react";
import NoteEditorHeader from "@/components/notes/NoteEditorHeader";
import NotesListWrapper from "@/components/notes/NotesListWrapper";

export default function Home() {
  const selectedNote = useStore($selectedNote);
  const mockNotes: Note[] = [
    {
      id: "1",
      heading: "Grocery List",
      text: "Milk, eggs, bread, and bananas. Don't forget almond milk, spinach, chicken breasts, rice, oats, and coffee filters. Might also need some snacks for the weekend like chips or chocolate.",
      lastUpdated: "2025-07-30T10:00:00Z",
    },
    {
      id: "2",
      heading: "Project Ideas",
      text: "Build a personal dashboard using Next.js and Tailwind. Integrate a calendar, task tracker, weather widget, and GitHub activity feed. Consider adding dark mode and real-time data updates using websockets.",
      lastUpdated: "2025-07-29T14:32:00Z",
    },
    {
      id: "3",
      heading: "Workout Plan",
      text: "Monday: Chest and triceps. Tuesday: Back and biceps. Wednesday: Legs and core. Thursday: Cardio and HIIT. Friday: Shoulders and abs. Saturday: Yoga and mobility. Sunday: Rest or light walk.",
      lastUpdated: "2025-07-28T07:45:00Z",
    },
    {
      id: "4",
      heading: "Book Notes",
      text: "Key takeaways from 'Atomic Habits': Focus on systems over goals. Identity-based habits are more powerful. Make habits obvious, attractive, easy, and satisfying. Small improvements compound over time.",
      lastUpdated: "2025-07-25T16:10:00Z",
    },
    {
      id: "5",
      heading: "Travel Checklist",
      text: "Passport, tickets, charger, toiletries, adapter. Add noise-cancelling headphones, sunglasses, light jacket, travel pillow, itinerary printout, emergency contacts, and a reusable water bottle.",
      lastUpdated: "2025-07-26T08:00:00Z",
    },
    {
      id: "6",
      heading: "Meeting Summary",
      text: "Discussed roadmap for Q3: focus on performance improvements, onboarding flow redesign, and analytics integration. Action items: finalize designs by Friday, start user interviews, review metrics weekly.",
      lastUpdated: "2025-07-24T13:30:00Z",
    },
    {
      id: "7",
      heading: "Learning Goals",
      text: "Master TypeScript generics and zod schemas. Learn about advanced type inference, utility types, and type-safe API contracts. Explore schema validation, parsing, and type narrowing in depth.",
      lastUpdated: "2025-07-23T18:50:00Z",
    },
    {
      id: "8",
      heading: "Recipe: Pasta Carbonara",
      text: "Ingredients: pasta, eggs, pancetta, parmesan. Whisk eggs with grated cheese, cook pancetta until crispy, reserve pasta water. Mix everything quickly off heat to create a creamy, rich sauce.",
      lastUpdated: "2025-07-21T12:00:00Z",
    },
    {
      id: "9",
      heading: "Client Feedback",
      text: "They loved the new UI, especially the clean layout and responsive design. Suggested improving the mobile nav, adding onboarding tips, and reducing initial load time on slower networks.",
      lastUpdated: "2025-07-20T09:15:00Z",
    },
    {
      id: "10",
      heading: "Daily Journal",
      text: "Felt productive today, finally deployed the MVP. Fixed the authentication bug and polished the dashboard. Looking forward to gathering feedback and iterating based on user behavior.",
      lastUpdated: "2025-07-19T21:05:00Z",
    },
  ];

  return (
    <div className="flex h-screen w-full">
      <NotesListWrapper notes={mockNotes} />
      <div className="flex flex-col  gap-4 flex-grow">
        <div className={"flex flex-col mx-auto w-full  h-full"}>
          <NoteEditorHeader note={selectedNote} />
          <div className={"w-1/2 mx-auto mt-20 p-8"}>
            <NoteEditor note={selectedNote} />
          </div>
        </div>
      </div>
    </div>
  );
}
