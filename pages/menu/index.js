import FlexContainer from "../../components/ui/containers/FlexContainer";
import BorderedColumnContainer from "../../components/ui/containers/BorderedColumnContainer";
import MenuCategory from "../../components/menu/MenuCategory";
import MenuCategorySection from "../../components/menu/MenuCategorySection";

export default function MenuPage(props) {
  return (
    <FlexContainer>
      <BorderedColumnContainer width="90%">
        <MenuCategorySection>
          <MenuCategory>Entrees</MenuCategory>
          <MenuCategory>Drinks</MenuCategory>
          <MenuCategory>Lunch</MenuCategory>
          <MenuCategory>Category</MenuCategory>
          <MenuCategory>Category</MenuCategory>
          <MenuCategory>Category</MenuCategory>
        </MenuCategorySection>
        {/* <MenuListingsSection>
          <MenuItem></MenuItem>
        </MenuListingsSection> */}
      </BorderedColumnContainer>
    </FlexContainer>
  );
}
