export default function redirectUser(ctx, location="/") {
    if (ctx.req) {
      console.log("REDIRECT CTX.RES");
      // ctx.res.redirect('/'); //You should only use "next/router" inside the client side of your app.
      ctx.res.writeHead(302, { Location: location });
      ctx.res.end();
    } else {
      console.log("PUSH");
  
      Router.push(location);
    }
  }