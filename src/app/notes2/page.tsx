'use client';

import Head from 'next/head';

import '@/globals.css';

import { clx } from '@/utils/clx';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const richTextClasses = clx(
  'prose prose-invert prose-ul:pl-0 prose-ul:ml-6 prose-li:pl-0 prose-ul:space-y-1 prose-h1:font-bold prose-h1:text-2xl prose-h1:mb-4 prose-h2:mb-2 max-w-none',
  'prose-h2:mt-0 prose-h3:mb-2 prose-h4:mb-2 prose-li:my-0',
  'prose-p:my-1 prose-hr:my-4 prose-ul:my-0 prose-label:mt-0'
);

type Note = {
  id: string;
  title: string;
};

type User = {
  name: string;
  email: string;
  picture: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const fetchNotes = async () => {
    // Fetch notes from the Spring Boot API
    fetch('http://localhost:8080/api/notes')
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/userinfo', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUser();

    if (user) {
      fetchNotes();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Note 2 Application</title>
        <meta
          name="description"
          content="This is a Note Application written in Next.js"
        />
      </Head>
      <div className="flex items-center justify-center h-screen flex-col">
        {user ? (
          <div>
            <Image
              src={'https://placehold.co/50x50/png'}
              width={50}
              height={50}
              alt={user.name}
              className="inline-block align-middle mr-2"
            />
            <div className="inline-block align-middle">
              <h2>Welcome, {user.name}</h2>
              <p>Email: {user.email}</p>
            </div>

            <div className="border p-5 m-5">
              <h1>Notes</h1>
              <ul>
                {notes.map((note) => (
                  <li key={note.id}>{note.title}</li>
                ))}
              </ul>
              {user !== null && (
                <Link href={'http://localhost:8080/logout'}>Logout</Link>
              )}
            </div>
          </div>
        ) : (
          <Link
            href={`http://localhost:8080/oauth2/authorization/google?redirectUrl=${encodeURIComponent(
              window.location.href
            )}`}
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
}
