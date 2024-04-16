export const questionSchema = {
  "name": "parseQuestion",
  "description": "Call this function to parse a question",
  "parameters": {
    "type": "object",
    "properties": {
      "arg": {
        "type": "string"
      }
    },
    "required": ["questionContent"]
  }
}

export const informationSchema = {
  "name": "parseInformation",
  "description": "Call this function to parse information",
  "parameters": {
    "type": "object",
    "properties": {
      "arg": {
        "type": "string"
      }
    },
    "required": ["informationContent"]
  }
}