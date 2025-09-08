<?php
function validate(mixed $input): string {
  if (!is_string($input)) return "Invalid types";
  if (strlen($input) > 1024) return "Too long";
  if (preg_match('/[^\x20-\x7E\r\n]/', $input)) return "Invalid characters";
  if (preg_match('*http|data|\\\\|\*|\[|\]|&|%|@|//*i', $input)) return "Invalid keywords";
  return $input;
}
?>
<!DOCTYPE html>
<html>
<body>
  <h1>pure-leak 🫨</h1>
  <h3>Source</h3>
  <pre><?php echo htmlspecialchars(file_get_contents(__FILE__)); ?></pre>
  <h3>Content</h3>
  <?php echo validate($_GET["content"] ?? "{{ your_input }}")."\n"; ?>
  <h3>Token</h3>
  <?php echo htmlspecialchars($_COOKIE["TOKEN"] ?? "TOKEN_0123456789abcdef"); ?>
  <h3>Usage</h3>
  <a href="/?content=your_input">/?content=your_input</a>
</body>
</html>
