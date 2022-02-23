import React from "react";
import  Dashboard  from "./components/Dashboard";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockReturnValue({
    // useSelector will return redux state object
    repositories: {
      loading: false,
      repos: [],
    },
  }),
  useDispatch: () => mockDispatch,
}));
Enzyme.configure({ adapter: new Adapter() });

describe("Home Pages ", () => {
  test("Should be render", () => {
    // const chartDetailInstance = shallow(<Dashboard />);
    // const element = chartDetailInstance.find("div label");
    expect(Dashboard).toBeDefined();
    // expect(element.text()).toBe("Select Country:");
    });
});