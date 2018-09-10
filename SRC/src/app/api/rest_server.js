const http = require("http");
const url = require("url");
const api = require("./api");
const fs = require("fs");

http.createServer((request, response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let urlParts = url.parse(request.url);
    let path = urlParts.pathname;

    handlePath(request, response, path);
}).listen(10001);

function handlePath(request, response, path) {
    console.log(path);
    switch(path) {
        case "/addhouse":
            getBody(request).then((body)=>{
                console.log(body);
                api.addHouse(body.address, body.price).then(()=>{
                    response.writeHead(200);
                    response.write("house added");
                    response.end();
                });
            });
            break;
        
        case "/gethouses":
            api.getHouses().then(houses =>{
                response.writeHead(200);
                response.write(JSON.stringify(houses));
                response.end();
            }).catch(error => {
                response.writeHead(400);
                response.write(JSON.stringify(error));
                response.end();
            });
        break;

        case "/removehouse":
            getBody(request).then((id)=>{
                api.removeHouse(id).then(()=>{
                    response.writeHead(200);
                    response.write("house removed");
                    response.end();
                }).catch(error => {
                    response.writeHead(400);
                    response.write(JSON.stringify(error));
                    response.end();
                });
            });
        break;

        case "/gettenants":
            api.getTenants().then(tenants => {
                response.writeHead(200);
                response.write(JSON.stringify(tenants));
                response.end();
            }).catch(error => {
                response.writeHead(400);
                response.write(JSON.stringify(error));
                response.end();
            });
        break;
        case "/addtenant":
            // TODO Prevent duplicates, same name. updated: duplicates allowed 06-06
            getBody(request).then((body)=>{
                console.log(body);
                api.addTenant(body.name,body.phoneNumber).then(()=>{
                    response.writeHead(200);
                    response.write("tenant added");
                    response.end();
                }).catch(error => {
                    response.writeHead(400);
                    response.write(JSON.stringify(error));
                    response.end();
                });
            });
        break;

        case "/removetenant":
            getBody(request).then((id)=>{
                api.removeTenant(id).then(()=>{
                    response.writeHead(200);
                    response.write("tenent removed");
                    response.end();
                }).catch(error => {
                    response.writeHead(400);
                    response.write(JSON.stringify(error));
                    response.end();
                });
            });
        break;

        default:
            let def = fs.readFileSync("./default.html").toString();
            response.writeHead(200);
            response.write(def);
            response.end();
            break;
        
    }
}

function getBody(request) {
	return new Promise((fulfill, fail) => {
		let data = "";

		request.on("data", chunk => {
            data += chunk;
            console.log(data);
		});
		request.on("error", error => {
			fail("failed");
		});
		request.on("end", () => {
			try {
				body = JSON.parse(data);
			} catch(e) {
				body = {};
			}
			fulfill(body);
		});
	});
}