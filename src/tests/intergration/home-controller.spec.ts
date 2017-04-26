import {fakeHttpServer, FakeServerApi} from "typeix";
import {assert, use} from "chai";
import * as sinonChai from "sinon-chai";
import {spy, assert as assertSpy} from "sinon";
import {Application} from "../../application";

// use chai spies
use(sinonChai);

describe("Home controller", () => {

    var server: FakeServerApi;

    before(() => {
        server = fakeHttpServer(Application);
    });

    function template(title, name, id) {
        return `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>${title}</title>\n</head>\n<body>\n<h4>Headline: ${name}</h4>\n<p>\n    Action id: ${id} name: ${name} <- Before each core &lt;- Before cache controller filter &lt;-null;\n</p>\n</body>\n</html>\n`;
    };

    it("Should test index action", (done) => {
        server.GET("/").then(data => {
            assert.equal(data.getBody(), template("Home page example", "this is home page", "NO_ID"));
            done();
        }).catch(done);
    });


    it("Should test home id action", (done) => {
        server.GET("/100/whatevericansee").then(data => {
            assert.equal(data.getBody(), template("Template engine with typeix", "whatevericansee", "100"));
            done();
        }).catch(done);
    });
});
