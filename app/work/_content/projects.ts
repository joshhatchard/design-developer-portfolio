import granic from "./granic";
import canvas from "./canvas";
import sudataMerchandise from "./sudata-merchandise";
import sudataLogoRedesign from "./sudata-logo-redesign";
import projectThree from "./project-three";
import interactiveBoxes from "./interactive-boxes";
import smallSymbols from "./small-symbols";
import photography from "./photography";
import startuplinkMerch from "./startuplink-merch";
import theoryAndCultureZine from "./theory-and-culture-zine";

export const projects = [
  granic,
  canvas,
  projectThree,
  sudataMerchandise,
  sudataLogoRedesign,
  interactiveBoxes,
  smallSymbols,
  photography,
  startuplinkMerch,
  theoryAndCultureZine,
];

export const getProject = (slug: string) => projects.find(project => project.slug === slug);
