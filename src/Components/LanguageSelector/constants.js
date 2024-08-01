export const LANGUAGE_OPTIONS = [
  {
    title: "Bash",
    label: "Bash (5.0.0)",
    value: 46,
    stub: "",
  },
  {
    title: "C",
    label: "C (GCC 9.2.0)",
    value: 50,
    stub: '// C: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\n#include <stdio.h>\n#include <stdbool.h>\n#include <stdlib.h>\n\n#define MAX 255\n\nvoid function_name(int arg){\n  // Write your code here\n}\n\nint main() {\n\n  int arg;\n  scanf("%d", &arg);\n  function_name(arg);\n\n  return 0;\n}\n\n',
  },
  {
    title: "C++",
    label: "C++ (GCC 9.2.0)",
    value: 54,
    stub: "// C++: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\n#include <iostream>\n#include <string>\nusing namespace std;\n\nvoid function_name(string arg){\n  // Write your code here\n}\n\nint main(){\n\n  string arg;\n  getline(cin, arg);\n  function_name(arg);\n\n  return 0;\n}\n\n",
  },
  {
    title: "C#",
    label: "C# (Mono 6.6.0.161)",
    value: 51,
    stub: `using System;
namespace Test
{
  class Program
  {
    public static void Main(string[] args)
    {
      Console.WriteLine("Hello, world!");
    }
  }
}
`,
  },
  {
    title: "Go",
    label: "Go (1.13.5)",
    value: 60,
    stub: "",
  },
  {
    title: "Java",
    label: "Java (OpenJDK 13.0.1)",
    value: 62,
    stub: "// Java: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\nimport java.util.Scanner;\n\nclass Result {\n  public static void functionName(String arg){\n    // Write your code here\n\n  }\n}\n\nclass Main {\n  public static void main(String args[]) {\n    Scanner scanner = new Scanner(System.in);\n    String arg = scanner.nextLine();\n\n    Result.functionName(arg);\n  }\n}\n",
  },
  {
    title: "JavaScript",
    label: "JavaScript (Node.js 12.14.0)",
    value: 63,
    stub: '// Default code for reading input data\nprocess.stdin.resume();\nprocess.stdin.setEncoding("utf-8");\nvar stdin = "";\n\nprocess.stdin.on("data", (input) => {\n  stdin += input;\n});\n\nprocess.stdin.on("end", () => {\n  stdin = stdin.split(\'\\n\');\n\n  functionName(stdin);\n});\n\nfunction functionName(stdin_array) {\n  /**\n    NOTE: Start modifying below code\n    if necessary parse input as required in question and\n    print your program\'s output using console.log\n\n    Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail\n    Following is only a sample code snippet and may not have anything to do with the question\n\n    stdin_array: array of inputs or lines read from stdin\n  */\n  console.log(stdin_array);\n}\n\n',
  },
  {
    title: "Python",
    label: "Python (2.7.17)",
    value: 70,
    stub: "# Python: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\ndef function_name(args):\n  # Write your code here\n\n\nargs = raw_input().strip()\nprint(function_name(args))\n\n",
  },
  {
    title: "Python",
    label: "Python (3.8.1)",
    value: 71,
    stub: "# Python: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\ndef function_name(args):\n  # Write your code here\n\n\nargs = input().strip()\nprint(function_name(args))\n\n",
  },
  {
    title: "Ruby",
    label: "Ruby (2.7.0)",
    value: 72,
    stub: "# Ruby: following is only a sample code snippet to read the input from stdin and may not have anything to do with the question\n\ndef function_name(args)\n  # Write your code here\n\nend\n\nargs = gets.chomp\nprint(function_name(args))\n\n",
  },
  {
    title: "Rust",
    label: "Rust (1.40.0)",
    value: 73,
    stub: "",
  },
];
