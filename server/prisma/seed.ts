declare const process: any;

import { prisma } from "../src/prisma";

async function main() {
  await prisma.service.deleteMany();

  // SPACE FEATURES (left side)
  const spaceFeatures = [
    {
      title: "Valgusküllane ruum",
      description: "Looduslik päevavalgus ja suured aknad",
      icon: "Check", // frontend overrides with blue check
      category: "space-feature",
    },
    {
      title: "Mahutavus",
      description: "Ruum mahutab kuni 15 inimest",
      icon: "Check",
      category: "space-feature",
    },
    {
      title: "Helisüsteem",
      description: "Professionaalne helisüsteem bluetooth ühendusega",
      icon: "Check",
      category: "space-feature",
    },
    {
      title: "Joogavarustus",
      description: "Joogamatid, plokid, pleedid ja padjad",
      icon: "Check",
      category: "space-feature",
    },
    {
      title: "Hubane kööginurk",
      description: "Võimalus teha teed või kohvi",
      icon: "Check",
      category: "space-feature",
    },
  ];

  // SPACE PRICING CARDS (right side)
  const spacePricing = [
    {
      title: "Tunnipõhine",
      description: "25€ — Ideaalne lühemateks sessioonideks, varustus kaasas",
      icon: "Clock",
      category: "space-pricing",
    },
    {
      title: "Pool päeva",
      description: "90€ — Sobib workshopideks, varustus kaasas",
      icon: "Clock4",
      category: "space-pricing",
    },
    {
      title: "Terve päev",
      description: "160€ — Ideaalne üritusteks, soodsam hind",
      icon: "Calendar",
      category: "space-pricing",
    },
  ];

  // ACTIVITIES TAB 
  const activityServices = [
    {
      title: "Jooga- ja meditatsioonitunnid",
      description: "Liikumise ja kehalise teadlikkuse praktikad",
      icon: "Sparkles",
      category: "activity",
    },
    {
      title: "Pilatese treeningud",
      description: "Korraldage regulaarseid treeninguid hubases ruumis",
      icon: "Heart",
      category: "activity",
    },
    {
      title: "Teetseremooniad",
      description: "Rahulikud hetked tee nautimiseks ja sisemise rahu leidmiseks",
      icon: "Coffee",
      category: "activity",
    },
    {
      title: "Helirännakud",
      description: "Sügavad tervendamise sessioonid",
      icon: "Music",
      category: "activity",
    },
    {
      title: "Hingamispraktikad",
      description: "Sügavavad ja turvalised rännakud alateadvusesse",
      icon: "Wind",
      category: "activity",
    },
    {
      title: "Kunstinäitused",
      description: "Stuudio ruumide seinad on ka kunstnikele galeriide korraldamiseks",
      icon: "Palette",
      category: "activity",
    },
    {
      title: "Eraüritused",
      description: "Looge meeldejäävaid kogemusi eriliste inimeste ringis",
      icon: "Heart",
      category: "activity",
    },
    {
      title: "Seminarid ja koolitused",
      description: "Ideaalne workshop'ideks ja töötubadeks",
      icon: "Users",
      category: "activity",
    },
    {
      title: "Ettevõtte heaolu",
      description: "Meeskonnaüritused ettevõtetele",
      icon: "Users",
      category: "activity",
    },
  ];

  await prisma.service.createMany({
    data: [...spaceFeatures, ...spacePricing, ...activityServices],
  });

  console.log("Service seed completed!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
