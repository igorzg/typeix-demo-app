import {fakeControllerActionCall, Injector, Router, Logger} from "typeix";
import {assert, use} from "chai";
import * as sinonChai from "sinon-chai";
import {spy, assert as assertSpy} from "sinon";
import {HomeController} from "../../controllers/home";
import {Assets} from "../../components/assets";

// use chai spies
use(sinonChai);

describe("Home controller", () => {

    it("Should test id action", (done) => {
        let id = 1;
        let name = "Igor";
        let injector = Injector.createAndResolve(Assets, [Logger, Router]);
        fakeControllerActionCall(
            injector,
            HomeController,
            "id",
            {
                name,
                id
            }
        ).then(data => {
            assert.equal(data, `After cache controller filter <- Action id: ${id} name: ${name} <- Before each core <- Before cache controller filter <-null`);
            done();
        }).catch(done);
    });


    it("Should index action", (done) => {
        let result = "After cache controller filter <- Action index home: <- Before each core <- Before cache controller filter <-null";
        let injector = Injector.createAndResolve(Assets, [Logger, Router]);
        fakeControllerActionCall(
            injector,
            HomeController,
            "index"
        ).then(data => {
            assert.equal(data, result);
            done();
        }).catch(done);
    });



    it("Should redirect action", (done) => {
        let mock = {
            createUrl: () => {}
        };
        let aSpy = spy(mock, "createUrl");
        let injector = Injector.createAndResolve(Assets, [
            Logger,
            {provide: Router, useValue: mock}
        ]);
        fakeControllerActionCall(
            injector,
            HomeController,
            "redirect"
        ).then(data => {
            assertSpy.calledWith(aSpy, "home/index", {});
            done();
        }).catch(done);
    });
});
