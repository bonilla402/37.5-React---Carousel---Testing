import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
  render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
  />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} =  render(<Carousel
      photos={TEST_IMAGES}
      title="images for testing"
  />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  
});

it("works when you click on the left arrow", function() {
  const { container } = render(
      <Carousel
          photos={TEST_IMAGES}
          title="images for testing"
      />
  );
  
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
      container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  expect(
      container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

});


it("hides left arrow when on the first image", function() {
  const { container } = render(
      <Carousel
          photos={TEST_IMAGES}
          title="images for testing"
      />
  );

  // Assuming that on the first render, it shows the first image and should hide the left arrow
  const leftArrow = container.querySelector('.bi-arrow-left-circle');
  expect(leftArrow).toHaveClass('hidden');
});


it("hides right arrow when on the last image", function() {
  const { container } = render(
      <Carousel
          photos={TEST_IMAGES}
          title="images for testing"
      />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // Click to reach the last image
  for (let i = 1; i < TEST_IMAGES.length; i++) {
    fireEvent.click(rightArrow);
  }
  
  // Assuming that after fireEvent.click(rightArrow) the last picture is displayed
  expect(rightArrow).toHaveClass('hidden');
});
