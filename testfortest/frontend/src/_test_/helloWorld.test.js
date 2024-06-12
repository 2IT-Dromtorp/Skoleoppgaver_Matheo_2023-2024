import { HelloWorld } from "../App";

it('adds text', ()=> {
    expect(HelloWorld("a","b")).toBe("ab");
    expect(HelloWorld("Vetle","Fongen")).toBe("VetleFongen");
    expect(HelloWorld("ABD","DBA")).toBe("ABDDBA");
});