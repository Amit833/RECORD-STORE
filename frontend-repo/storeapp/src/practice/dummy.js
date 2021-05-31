//   let response = await fetch("http://localhost:8080/login", {
//       method:"POST",
//       headers:{
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'

//       },
//       body:JSON.stringify(data)
//   })

//   let result = await response.json()

//  console.log(result);

// useEffect(() => {
//     const getData = async () => {
//         let res = await updateUserProfile(firstName)
//         setloginUser(res.data)
//     }
//     getData()
// }, [])

// console.log("loginUser=>", loginUser.firstName);

// const headers = {
//     'Content_Type': 'application/json'
// }

// .....................................

// exports.payment = (req, res, next) => {
//    // res.json("hello");

//    const { product, token } = req.body;
//    const idempotencyKey = uuid();

//    return stripe.customers
//      .create({
//        email: token.email,
//        source: token.id,
//      })

//      .then((customer) => {
//        stripe.charges.create(
//          {
//            amount: product.price,
//            currency: "usd",
//            customer: customer.id,
//            receipt_email: token.email,
//            description: product.name,
//            shipping: {
//              name: token.card.name,
//              address: {
//                country: token.card.address_country,
//              },
//            },
//          },
//          { idempotencyKey }
//        );
//      })
//      .then((result) => res.status(200).json(result))
//      .catch((err) => console.log(err));
//  };
