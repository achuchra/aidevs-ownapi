export const questionSchema = {
  "name": "parseQuestion",
  "description": "Call this function when a message expects you to provide an answer",
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
  "description": "Call this function when a message provides some information to you.",
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