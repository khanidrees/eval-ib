import { rest } from "msw";

export const handlers = [
//   rest.get("https://my.backend/book", (_req, res, ctx) => {
//     return res(
//       ctx.json({
//         title: "Lord of the Rings",
//         imageUrl: "/book-cover.jpg",
//         description:
//           "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
//       }),
//     );
//   }),
  rest.get("/eval", (_req, res, ctx) => {
    return res(
      ctx.json({
        overAllData:{
            score:10,
            outoff:20,
            remark:"Good"
        },
        criterias:{
            A:{
                score:7,
                outoff:10,
                remark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum."        
            },
            B:{
                score:5,
                outoff:10,
                remark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum." 
            },
            C:{
                score:3,
                outoff:10,
                remark:"Dolore do cupidatat laborum sint incididunt excepteur ea nisi. Irure tempor et reprehenderit sit eu. Aute id cupidatat enim labore id ad ad exercitation reprehenderit. Cupidatat nostrud dolore dolore occaecat anim Lorem labore. Occaecat fugiat elit ipsum nisi irure est esse minim est. Velit voluptate reprehenderit mollit cillum consectetur et cupidatat laborum." 
            }
        }
    }),
    );
  }),
];