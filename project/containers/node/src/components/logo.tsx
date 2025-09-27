import Link from "next/link";
import Image from "next/image";
import LogoWhite from "@/../public/assets/img/investment_salad_blk.svg";
import LogoBlack from "@/../public/assets/img/investment_salad_wht.svg";

export default function Logo() {
  return (
    <Link className="flex items-center" href="/app/dashboard">
      <Image className="w-full max-w-44 block dark:hidden" src={LogoWhite} alt={"LogoWhite"} />
      <Image className="w-full max-w-44 hidden dark:block" src={LogoBlack} alt={"LogoBlack"} />
    </Link>
  );
}
