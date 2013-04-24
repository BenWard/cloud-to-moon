(function () {
  function walk (node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E

    var child, next;

    switch (node.nodeType) {
      case 1:
      case 9:
      case 11: // Document, element and fragment
        child = node.firstChild;
        while (child) {
          walk(child);
          child = child.nextSibling;
        }
        break;
      case 3: // Text node
        handleText(node);
        break;
      default:
        break;
    }
  }

  function handleText (textNode) {
    var v = textNode.nodeValue.replace(/\b([Ii]n )?([Tt])he ([Cc])loud\b/g,
      function (match, i, t, c) {
        var moon = [];
        if (i) moon.push(i.charAt(0) == 'I' ? "On" : "on");
        moon.push(t.charAt(0) == 'T' ? "The" : "the");
        moon.push(c.charAt(0) == 'C' ? "Moon" : "moon");
        return moon.join(' ');
      }
    ).replace(/\b([Cc])loud(-based| computing)\b/g,
      function(match, c, suffix) {
        var moon = [];
        moon.push(c.charAt(0) == 'C' ? "Moon" : "moon");
        moon.push(suffix);
        return moon.join('');
      }
    );
    textNode.nodeValue = v;
  }

  walk(document.body);
})();