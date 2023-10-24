import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

interface HomeProps {}

function Home({}: HomeProps): JSX.Element | null {
  return <h1>Hello World</h1>;
}

export default Home;
