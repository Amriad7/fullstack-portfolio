import { Outlet } from "react-router";
import Footer from "~/components/footer";
import Header from "~/components/header";
import type { Route } from "./+types/layout";
import { api } from "~/lib/api";

export const loader = async ({}: Route.LoaderArgs) => {
  try {
    const { data } = await api.get("/settings");
    return data
      ? [
          { title: data.title },
          { name: "description", content: data.description },
          { name: "keywords", content: data.keywords },
        ]
      : [{ title: "Portfolio" }];
  } catch (error) {
    console.log("Settings not found");
  }
};

export function meta({ data }: Route.MetaArgs) {
  return data;
}

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_3.75rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default PublicLayout;
