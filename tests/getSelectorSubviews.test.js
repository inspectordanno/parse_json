import { getJSON, getSelectorSubviews } from '../index';

const fixture = {
  "subviews": [
    {
      "class": "StackView",
      "classNames": [
        "container"
      ],
      "subviews": [
        {
          "class": "StackView",
          "classNames": [
            "columns",
            "container"
          ],
          "subviews": [
            {
              "class": "StackView",
              "classNames": [
                "column",
                "container"
              ],
              "subviews": [
                {
                  "class": "Box",
                  "label": {
                    "text": {
                      "text": "Display"
                    }
                  },
                  "contentView": {
                    "subviews": [
                      {
                        "class": "Input",
                        "label": {
                          "text": {
                            "text": "Video mode"
                          }
                        },
                        "control": {
                          "class": "VideoModeSelect",
                          "identifier": "videoMode"
                        }
                      },
                      {
                        "class": "Input",
                        "label": {
                          "text": {
                            "text": "High DPI (4K)"
                          }
                        },
                        "control": {
                          "class": "CvarCheckbox",
                          "var": "r_allow_high_dpi"
                        }
                      }              
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
      
it('should return three StackViews', async () => {
  const json = await getJSON(fixture);
  const views = getSelectorSubviews('StackView', 'class', json);
  expect(views).toHaveLength(3);
});