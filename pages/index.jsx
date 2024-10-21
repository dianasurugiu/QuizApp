
import Link from "next/link";



export default function Home() {
  return (
   <div className="home-container">
       <h1>Home</h1>
   
        <p>Bine ai venit la Quiz App</p>

    <Link href="/categories" className="home-link">Categorii</Link>
    <Link href="/add-question" className="home-link">Adaugă Întrebare</Link>
   
   </div>
  );
}
