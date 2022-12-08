/* eslint-disable react/react-in-jsx-scope */
import {
  GiBeerBottle,
  GiGlassShot,
  GiWineBottle,
  GiWineGlass,
} from "react-icons/gi";
import { IoBeerOutline } from "react-icons/io5";

export default [
  {
    label: "4 cl",
    value: 40,
    logo: <GiGlassShot />,
  },
  {
    label: "1 dl",
    value: 100,
    logo: <GiWineGlass />,
  },
  {
    label: "330 ml",
    value: 330,
    logo: <GiBeerBottle />,
  },
  {
    label: "500 ml",
    value: 500,
    logo: <IoBeerOutline />,
  },
  {
    label: "750 ml",
    value: 750,
    logo: <GiWineBottle />,
  },
];
