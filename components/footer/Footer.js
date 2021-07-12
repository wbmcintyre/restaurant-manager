import FooterSection from "./FooterSection";
import FooterSubSection from "./FooterSubSection";
import LogoLink from "../ui/Links/LogoLink";
import Link from "next/link";

function Footer(props) {
  return (
    <FooterSection>
      <FooterSubSection>
        <LogoLink src="/Logo-RM.png" alt="Restaurant Manager Logo"></LogoLink>
      </FooterSubSection>
      <FooterSubSection>
        <p>Links: </p>
        <Link href="/">Menu</Link>
        <Link href="/">Contact Us</Link>
      </FooterSubSection>
      <FooterSubSection>
        <p>Icon links for Facebook, twitter, instagram</p>
      </FooterSubSection>
      <FooterSubSection>
        <p>Copyright</p>
      </FooterSubSection>
    </FooterSection>
  );
}

export default Footer;
