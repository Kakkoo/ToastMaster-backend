import React, { Component } from 'react'
import AdaptiveCard from "react-adaptivecards";
export default class Adaptivecard extends Component {
  // payload = {
  //   type: "AdaptiveCard",
  //   version: "1.0",
  //   body: [
  //     {
  //       type: "TextBlock",
  //       text: "Here is a ninja cat",
  //     },
  //     {
  //       type: "Image",
  //       url: "http://adaptivecards.io/content/cats/1.png",
  //     },
  //   ],
  // };
  constructor() {
    super();
    //Local state
    this.state = {
     
    };
  }
  render() {
    return (
      <div>
        <AdaptiveCard
          style={{ width: "500px", border: "1px solid black" }}
          payload={{
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.0",
            body: [
              {
                speak:
                  "Tom's Pie is a Pizza restaurant which is rated 9.3 by customers.",
                type: "ColumnSet",
                columns: [
                  {
                    type: "Column",
                    width: 2,
                    items: [
                      {
                        type: "TextBlock",
                        text: "PIZZA",
                      },
                      {
                        type: "TextBlock",
                        text: "Tom's Pie",
                        weight: "bolder",
                        size: "extraLarge",
                        spacing: "none",
                      },
                      {
                        type: "TextBlock",
                        text: "4.2 ★★★☆ (93) · $$",
                        isSubtle: true,
                        spacing: "none",
                      },
                      {
                        type: "TextBlock",
                        text:
                          "**Matt H. said** \"I'm compelled to give this place 5 stars due to the number of times I've chosen to eat here this past year!\"",
                        size: "small",
                        wrap: true,
                      },
                    ],
                  },
                  {
                    type: "Column",
                    width: 1,
                    items: [
                      {
                        type: "Image",
                        url: "https://picsum.photos/300?image=882",
                        size: "auto",
                      },
                    ],
                  },
                ],
              },
            ],
            actions: [
              {
                type: "Action.OpenUrl",
                title: "More Info",
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              },
            ],
          }}
        />
      </div>
    );
  }
}
