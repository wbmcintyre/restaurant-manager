import FooterSection from "./FooterSection";
import FooterSubSection from "./FooterSubSection";
import LogoLink from "../ui/Links/LogoLink";
import FooterLink from "../ui/Links/FooterLink";
import FacebookLink from "../ui/Links/FacebookLink";
import InstagramLink from "../ui/Links/InstagramLink";
import TwitterLink from "../ui/Links/TwitterLink";

function Footer(props) {
  return (
    <FooterSection>
      <FooterSubSection>
        <LogoLink src="/Logo-RM.png" alt="Restaurant Manager Logo"></LogoLink>
      </FooterSubSection>
      <FooterSubSection>
        <FooterLink href="/menu">Menu</FooterLink>
        <FooterLink href="/contact">Contact Us</FooterLink>
      </FooterSubSection>
      <FooterSubSection>
        <FacebookLink href="/" />
        <TwitterLink href="/" />
        <InstagramLink href="/" />
      </FooterSubSection>
      <FooterSubSection>
        <p>© COPYRIGHT 2021. ALL RIGHTS RESERVED.</p>
      </FooterSubSection>
    </FooterSection>
  );
}

export default Footer;
