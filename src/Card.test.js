import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

const currCard = TEST_IMAGES[0];
const total = TEST_IMAGES.length;

// smoke test
it("renders without crashing", function() {
    render(<Card
        caption={currCard.caption}
        src={currCard.src}
        currNum={1}
        totalNum={total}
    />);
});

// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Card
        caption={currCard.caption}
        src={currCard.src}
        currNum={1}
        totalNum={total}
    />);
    expect(asFragment()).toMatchSnapshot();
});