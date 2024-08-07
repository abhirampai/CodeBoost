# CodeBoost

<img src="https://raw.githubusercontent.com/abhirampai/CodeBoost/main/public/favicon.ico">
CodeBoost is a code runner that allows you to refactor and run your code in one convenient location. With CodeBoost, you can improve the quality and readability of your code with just a few clicks, and then run it to see the results instantly.

# Demo

https://user-images.githubusercontent.com/36255896/228125452-a45c4924-6849-49a5-80c9-2ea92fbcc5f9.mp4

# Features

- <b>Select AI model for refactoring:</b> CodeBoost allows the user to select the model they want to use for refactoring the code, provided the browser supports webGPU. Else CodeBoost uses google gemini by default.
  Selection Using the modal selection modal
  ![select model using selection modal](https://github.com/user-attachments/assets/8c536f0d-2bce-4f25-8044-c28cf2174649)
  Selection using the radio button in user prompt
  <img width="1001" alt="selection using the radio button in user prompt" src="https://github.com/user-attachments/assets/3a2c5791-93ac-4765-9ca5-d2b98a68846c">

- <b>Code refactoring:</b> CodeBoost makes it easy to refactor your code by suggesting changes that will improve its quality, readability, and performance. You can choose to refactor the whole code or part of code by selecting the code snippet and refactor that part.
  https://github.com/user-attachments/assets/5779467c-7390-47a0-88bd-668aa6b913bd
  
- <b>Code running</b>: CodeBoost allows you to run your code directly from the editor, without having to switch to a different tool or environment. You can run your code as many times as you like, with different input values, and see the output and any errors or exceptions that occur.
  https://github.com/user-attachments/assets/ff5a754b-b65e-42fc-9d9f-201217155d73


# Languages supported

- Bash
- C
- C++
- C#
- Python
- Java
- Rust
- Go
- Ruby
- JavaScript

# APIs

- Judge0CE

# Packages
- [web-llm](https://github.com/mlc-ai/web-llm) with Phi 3 model ( doesn't work with browsers not supporting webGPU )
- [@google/generative-ai](github.com/google/generative-ai-js) with gemini-1.5-flash

# Contributing

If you want to contribute to this project, feel free to open an issue or submit a pull request on GitHub.
You can also contribute by forking or creating a branch from [codesandbox](https://codesandbox.io/s/github/abhirampai/CodeBoost)

# Acknowledgements

Created with CodeSandbox
