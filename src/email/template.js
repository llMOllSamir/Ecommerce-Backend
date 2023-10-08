export let emailTemplate = (token) => {
  return `<!doctype html>
  <html>
  
  <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <link href='https://fonts.googleapis.com/css?family=Open-Sans' rel='stylesheet' type='text/css'>
      <style>
          /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
  
          img {
              border: none;
              -ms-interpolation-mode: bicubic;
              max-width: 100%;
          }
  
          body {
              background-color: #2F393B;
              font-family: 'Open Sans', sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 15px;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
          }
  
          table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
          }
  
          table td {
              font-family: 'Open Sans', sans-serif;
              font-size: 15px;
              vertical-align: top;
          }
          /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
          .body {
              background-color: #2F393B;
              color: #ffffff;
              width: 100%;
          }
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
  
          .container {
              display: block;
              Margin: 0 auto !important;
              /* makes it centered */
              max-width: 400px;
              padding: 10px;
              width: 400px;
          }
          /* This should also be a block element, so that it will fill 100% of the .container */
  
          .content {
              box-sizing: border-box;
              display: block;
              Margin: 0 auto;
              max-width: 400px;
              /*padding: 10px;*/
          }
          /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
  
          .main {
              background: #3B474A;
              border: 1px solid #232B2C;
              border-radius: 3px;
              width: 100%;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2)
          }
  
          .wrapper {
              box-sizing: border-box;
              padding: 20px;
          }
  
          .footer {
              clear: both;
              padding-top: 10px;
              width: 100%;
          }
  
          .footer td,
          .footer p,
          .footer span,
          .footer a {
              color: #ffffff;
              font-weight: bold;
              font-size: 12px;
              padding-left: 10px;
              padding-right: 10px;
          }
          /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
  
          h1,
          h2,
          h3,
          h4 {
              color: #ffffff;
              font-family: 'Open Sans', sans-serif;
              font-weight: 400;
              line-height: 1.5;
              margin: 0;
              Margin-bottom: 30px;
          }
  
          h1 {
              font-size: 35px;
              font-weight: 300;
              text-align: center;
              text-transform: capitalize;
          }
  
          p,
          ul,
          ol {
              font-family: 'Open Sans', sans-serif;
              font-size: 15px;
              font-weight: normal;
              margin: 0;
              Margin-bottom: 15px;
          }
  
          p li,
          ul li,
          ol li {
              list-style-position: inside;
              margin-left: 5px;
          }
  
          a {
              color: #00bbc9;
              text-decoration: underline;
          }
          /* -------------------------------------
            BUTTONS
        ------------------------------------- */
  
          .btn {
              box-sizing: border-box;
              width: 100%;
          }
  
          .btn>tbody>tr>td {
              padding-bottom: 15px;
          }
  
          .btn table {
              width: 100%;
          }
  
          .btn table td {
              background-color: #ffffff;
              border-radius: 3px;
              text-align: center;
          }
  
          .btn a,
          .btn a:hover {
              background-color: #00bbc9;
              border: solid 1px #00a8b5;
              border-radius: 3px;
              box-sizing: border-box;
              color: #f2f3f2;
              cursor: pointer;
              display: inline-block;
              font-size: 15px;
              margin: 0;
              padding: 10px 15px;
              text-decoration: none;
              text-transform: capitalize;
              width: 100%;
          }
  
          .btn-primary table td {
              background-color: #00bbc9;
          }
  
          .btn-primary a {
              background-color: #00bbc9;
              border-color: #00a8b5;
              color: #f2f3f2;
          }
          /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
  
          .last {
              margin-bottom: 0;
          }
  
          .first {
              margin-top: 0;
          }
  
          .align-center {
              text-align: center;
          }
  
          .align-right {
              text-align: right;
          }
  
          .align-left {
              text-align: left;
          }
  
          .clear {
              clear: both;
          }
  
          .mt0 {
              margin-top: 0;
          }
  
          .mb0 {
              margin-bottom: 0;
          }
  
          .logo {
              text-align: center;
              padding: 20px;
          }
  
          .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
          }
          /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
  
          @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important;
              }
              table[class=body] p,
              table[class=body] ul,
              table[class=body] ol,
              table[class=body] td,
              table[class=body] span,
              table[class=body] a {
                  font-size: 16px !important;
              }
              table[class=body] .wrapper,
              table[class=body] .article {
                  padding: 10px !important;
              }
              table[class=body] .content {
                  padding: 0 !important;
              }
              table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important;
              }
              table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important;
              }
              table[class=body] .btn table {
                  width: 100% !important;
              }
              table[class=body] .btn a {
                  width: 100% !important;
              }
              table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important;
              }
          }
          /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
  
          @media all {
              .ExternalClass {
                  width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                  line-height: 100%;
              }
              .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important;
              }
              .btn-primary table td:hover {
                  background-color: #00bbc9 !important;
              }
              .btn-primary a:hover {
                  background-color: #00bbc9 !important;
                  border-color: #00a8b5 !important;
              }
          }
      </style>
  </head>
  
  <body class="">
      <table border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
              <td class="container">
                  <div class="content">
  
                      <!-- START CENTERED WHITE CONTAINER -->
                       <table class="main">
  
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td></td>
                              <td width="400" class="wrapper">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                          <td>
                                              <p style="color:#FFFFFF">Hi there,</p>
                                              <p style="color:#FFFFFF">It's Only one More step to Can Easy Enjoy shopping with us </p>
                                              <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                  <tbody>
                                                      <tr>
                                                          <td>
                                                              <table border="0" cellpadding="0" cellspacing="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td> <a href="http://localhost:4000/api/v1/auth/confirmEmail/${token}" target="_blank">Verify</a> </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                              <p style="color:#FFFFFF">We Hope You Enjoying With Us In Our Shopping Online Market </p>
                                              <p style="color:#FFFFFF">Good luck! Hope it works.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                            <td></td>
                          </tr>
  
                          <!-- END MAIN CONTENT AREA -->
                      </table>
  
                      <!-- START FOOTER -->
                      <div class="footer">
                          <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td align="left" class="content-block">
                                      <span class="apple-link">01280025507</span>
                                  </td>
                                  <td align="right" class="content-block">
                                      <span class="apple-link">mohamedsamirelshami@gmail.com</span>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <!-- END FOOTER -->
  
                      <!-- END CENTERED WHITE CONTAINER -->
                  </div>
              </td>
              <td>&nbsp;</td>
          </tr>
      </table>
  </body>
  
  </html>
  `
};
export let resetTemplate = (code) => {
  return `<!doctype html>
  <html>
  
  <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <link href='https://fonts.googleapis.com/css?family=Open-Sans' rel='stylesheet' type='text/css'>
      <style>
          /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
  
          body {
              background-color: #2F393B;
              font-family: 'Open Sans', sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 15px;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%;
          }
  
          table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%;
          }
  
          table td {
              font-family: 'Open Sans', sans-serif;
              font-size: 15px;
              vertical-align: top;
          }
          /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
          .body {
              background-color: #2F393B;
              color: #ffffff;
              width: 100%;
          }
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
  
          .container {
              display: block;
              Margin: 0 auto !important;
              /* makes it centered */
              max-width: 400px;
              padding: 10px;
              width: 400px;
          }
          /* This should also be a block element, so that it will fill 100% of the .container */
  
          .content {
              box-sizing: border-box;
              display: block;
              Margin: 0 auto;
              max-width: 400px;
              /*padding: 10px;*/
          }
          /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
  
          .main {
              background: #3B474A;
              border: 1px solid #232B2C;
              border-radius: 3px;
              width: 100%;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.2)
          }
  
          .wrapper {
              box-sizing: border-box;
              padding: 20px;
          }
  
          .footer {
              clear: both;
              padding-top: 10px;
              width: 100%;
          }
  
          .footer td,
          .footer p,
          .footer span,
          .footer a {
              color: #ffffff;
              font-weight: bold;
              font-size: 12px;
              padding-left: 10px;
              padding-right: 10px;
          }
          /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
  
          h1,
          h2,
          h3,
          h4 {
              color: #ffffff;
              font-family: 'Open Sans', sans-serif;
              font-weight: 400;
              line-height: 1.5;
              margin: 0;
              Margin-bottom: 30px;
          }
  
          h1 {
              font-size: 35px;
              font-weight: 300;
              text-align: center;
              text-transform: capitalize;
          }
  
          p,
          ul,
          ol {
              font-family: 'Open Sans', sans-serif;
              font-size: 15px;
              font-weight: normal;
              margin: 0;
              Margin-bottom: 15px;
          }
  
          p li,
          ul li,
          ol li {
              list-style-position: inside;
              margin-left: 5px;
          }
  
          a {
              color: #00bbc9;
              text-decoration: underline;
          }
          /* -------------------------------------
            BUTTONS
        ------------------------------------- */
  
          .btn {
              box-sizing: border-box;
              width: 100%;
          }
  
          .btn>tbody>tr>td {
              padding-bottom: 15px;
          }
  
          .btn table {
              width: 100%;
          }
  
          .btn table td {
              background-color: #ffffff;
              border-radius: 3px;
              text-align: center;
          }
  
          .btn a,
          .btn a:hover {
              background-color: #00bbc9;
              border: solid 1px #00a8b5;
              border-radius: 3px;
              box-sizing: border-box;
              color: #f2f3f2;
              cursor: pointer;
              display: inline-block;
              font-size: 15px;
              margin: 0;
              padding: 10px 15px;
              text-decoration: none;
              width: 100%;
          }
  
          .btn-primary table td {
              background-color: #00bbc9;
          }
  
          .btn-primary a {
              background-color: #00bbc9;
              border-color: #00a8b5;
              color: #f2f3f2;
          }
          /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
  
          .last {
              margin-bottom: 0;
          }
  
          .first {
              margin-top: 0;
          }
  
          .align-center {
              text-align: center;
          }
  
          .align-right {
              text-align: right;
          }
  
          .align-left {
              text-align: left;
          }
  
          .clear {
              clear: both;
          }
  
          .mt0 {
              margin-top: 0;
          }
  
          .mb0 {
              margin-bottom: 0;
          }
  
          .logo {
              text-align: center;
              padding: 20px;
          }
  
          .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0;
          }
          /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
  
          @media only screen and (max-width: 620px) {
              table[class=body] h1 {
                  font-size: 28px !important;
                  margin-bottom: 10px !important;
              }
              table[class=body] p,
              table[class=body] ul,
              table[class=body] ol,
              table[class=body] td,
              table[class=body] span,
              table[class=body] a {
                  font-size: 16px !important;
              }
              table[class=body] .wrapper,
              table[class=body] .article {
                  padding: 10px !important;
              }
              table[class=body] .content {
                  padding: 0 !important;
              }
              table[class=body] .container {
                  padding: 0 !important;
                  width: 100% !important;
              }
              table[class=body] .main {
                  border-left-width: 0 !important;
                  border-radius: 0 !important;
                  border-right-width: 0 !important;
              }
              table[class=body] .btn table {
                  width: 100% !important;
              }
              table[class=body] .btn a {
                  width: 100% !important;
              }
              table[class=body] .img-responsive {
                  height: auto !important;
                  max-width: 100% !important;
                  width: auto !important;
              }
          }
          /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
  
          @media all {
              .ExternalClass {
                  width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                  line-height: 100%;
              }
              .apple-link a {
                  color: inherit !important;
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  text-decoration: none !important;
              }
              .btn-primary table td:hover {
                  background-color: #00bbc9 !important;
              }
              .btn-primary a:hover {
                  background-color: #00bbc9 !important;
                  border-color: #00a8b5 !important;
              }
          }
      </style>
  </head>
  
  <body class="">
      <table border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
              <td class="container">
                  <div class="content">
  
                      <!-- START CENTERED WHITE CONTAINER -->
                       <table class="main">
  
                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td></td>
                              <td width="400" class="wrapper">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tr>
                                          <td>
                                              <p style="color:#FFFFFF">Hi there,</p>
                                              <p style="color:#FFFFFF">Don't Share Your Secret Code With Any one For more secure </p>
                                              <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                                  <tbody>
                                                      <tr>
                                                          <td>
                                                              <table border="0" cellpadding="0" cellspacing="0">
                                                                  <tbody>
                                                                      <tr>
                                                                          <td> <a>${code}</a> </td>
                                                                      </tr>
                                                                  </tbody>
                                                              </table>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                              <p style="color:#FFFFFF">We Hope You Enjoying With Us In Our Shopping Online Market </p>
                                              <p style="color:#FFFFFF">Good luck! Hope it works.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                            <td></td>
                          </tr>
  
                          <!-- END MAIN CONTENT AREA -->
                      </table>
  
                      <!-- START FOOTER -->
                      <div class="footer">
                          <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td align="left" class="content-block">
                                      <span class="apple-link">01280025507</span>
                                  </td>
                                  <td align="right" class="content-block">
                                      <span class="apple-link">mohamedsamirelshami@gmail.com</span>
                                  </td>
                              </tr>
                          </table>
                      </div>
                      <!-- END FOOTER -->
  
                      <!-- END CENTERED WHITE CONTAINER -->
                  </div>
              </td>
              <td>&nbsp;</td>
          </tr>
      </table>
  </body>
  
  </html>
  `
};
