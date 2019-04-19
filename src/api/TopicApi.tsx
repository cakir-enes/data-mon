import { useState, useEffect } from "react";

class TopicApi {
  topicStore: any = { TEST: firstObj };

  formatDate = (date: Date) =>
    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  getFieldsOf(name: string) {
    let fields = [] as string[];
    for (var p in firstObj) fields.push(p);
    return fields;
  }

  subscribeToTopic(name: string, callback: (t: any) => void) {
    callback({ ...firstObj, timeStamp: this.formatDate(new Date()) });
    setInterval(
      () => callback({ ...firstObj, timeStamp: this.formatDate(new Date()) }),
      2000
    );
  }

  unsubscribeFromTopic(name: string) {
    console.log(`UNSUBBING ${name}`);
  }
}

export let topicApi = new TopicApi();

const json = [
  {
    id: "0001",
    type: "donut",
    name: "Cake",
    ppu: 0.55,
    batters: {
      batter: [
        { id: "1001", type: "Regular" },
        { id: "1002", type: "Chocolate" },
        { id: "1003", type: "Blueberry" },
        { id: "1004", type: "Devil's Food" }
      ]
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5005", type: "Sugar" },
      { id: "5007", type: "Powdered Sugar" },
      { id: "5006", type: "Chocolate with Sprinkles" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" }
    ]
  },
  {
    id: "0002",
    type: "donut",
    name: "Raised",
    ppu: 0.55,
    batters: {
      batter: [{ id: "1001", type: "Regular" }]
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5005", type: "Sugar" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" }
    ]
  },
  {
    id: "0003",
    type: "donut",
    name: "Old Fashioned",
    ppu: 0.55,
    batters: {
      batter: [
        { id: "1001", type: "Regular" },
        { id: "1002", type: "Chocolate" }
      ]
    },
    topping: [
      { id: "5001", type: "None" },
      { id: "5002", type: "Glazed" },
      { id: "5003", type: "Chocolate" },
      { id: "5004", type: "Maple" }
    ]
  }
];

function parseJson(obj: any, name: string): any {
  let topic = {};
  let vals = [];
  _parseJson(obj, name, topic);
  return topic;
}
function _parseJson(obj: any, str = "", topic: any) {
  let type = Array.isArray(obj) ? "array" : typeof obj;
  switch (type) {
    case "array":
      obj.forEach((it: any, idx: number) =>
        _parseJson(it, `${str}[${idx}]`, topic)
      );
      break;
    case "object":
      for (var prop in obj) {
        _parseJson(obj[prop], `${str}.${prop}`, topic);
      }
      break;
    default:
      console.log(`${str} -> ${obj}`);
      topic[str] = obj;
  }
}

let firstObj = parseJson(json, "TP");
