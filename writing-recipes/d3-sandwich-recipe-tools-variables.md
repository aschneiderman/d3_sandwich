## Workflow for One Toy per Unique Variable (e.g., Height)

NOTE: Atom isn't reading snippets that are in the recipe-tools package.
Then again, the commands that should be in the package aren't showing up under Packages
on my desktop at work. So maybe that's the issue? See if that's a problem at home as well.




### Get the Code Set up In Pre-Formatted Form
1) Copy the D3 code you want to make interactive.

2) Move the cursor to the location in the recipe Step where you want to add the interactive toy.

3) Type  *((the right snippet name))*, then press the *Tab* key.  You should now see the HTML code shell for an interactive toy.

4) Press *Tab*

### Add Tags to the Code so We Can Interactively Update  It
(explain what we are doing)

1) Press
(???)
or use the command palette to run *d3sr:: html-format-code*. This should
- insert the code with any HTML – e.g., "<svg" – converted so the web browser will display the HTML and not treat it like a command (explain)
- Put the cursor at the right place inside the pre tag so you can enter the pre's class.

2) Select the part of the preformatted code where there are variables and values – e.g.:
>height = 40;
>var cellSize = 39, fill = "Red";
Then use the command palette to run *d3sr:: add-variable-tagging*.  Atom will add the HTML italics tags. In this case, it'll look like the following:
> height = <i class="height">40</i >;
>var cellSize = 39</i>, fill = <i class="fill">"Red"<i>;

3) You may have some values you want the toy to interactively update that are stored as variables. What you'll need to do is
((explain))

### Use the Code Tags To Create the Input Form
Although we put in the code tags so we can easily update the variables' values, we can get more out of them. If you take a look at, say, the one for height, you'll see that it contains the 2 things we need for an input form about height: the variable name, height, and the value, 40. If we got that data, we can use it to create the input form. Guess what? There's a command for that!

Select the code that has the new code tags, then use the command palette to run *d3sr:: mail-merge-input-form*.  Atom will move the cursor down to the right place ((what's the right class name?)) and then create the input form. You just save yourself a whole bunch of work.



### Use the Code Tags To Create a Draft of the Toy's Update Data
