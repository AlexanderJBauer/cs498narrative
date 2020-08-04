Alexander Bauer

John C. Hart

CS 498: Data Visualization

Aug 2nd, 2020

<center><h1>Narrative Visualization: The War on Drugs</h1></center>

## Introduction
The interactive web page for this narrative can be found at https://AlexanderJBauer.github.io/cs498narrative.

This PDF was generated from Markdown. To get the original content, as well as see the source code, please visit the [repo](https://github.com/AlexanderJBauer/cs498narrative).

This narrative visualization is entirely based on police arrest data. To see the master data used in this visualization, see [arrestsByYearWithRace.csv](https://github.com/AlexanderJBauer/cs498narrative/data/arrestsByYearWithRace.csv). There are several categories of violations, but the primary focus is on "Drug abuse violations". The arrest numbers are broken down by category and by race.

All of the data for this visualization was pulled and cleaned from the [FBI](https://www.fbi.gov/services/cjis/ucr/publications) and the [OJJDP](https://www.ojjdp.gov/ojstatbb/crime/ucr.asp?table_in=2&selYrs=2000&rdoGroups=1&rdoData=c).

## Message
The message communicated through this narrative visualization is the correlation between the Comprehensive Crime Control Act of 1984 and the sharp increase in the number of drug abuse violation arrests in the last 35 years.

## Narative and Visual Structure
The structure used for this narrative was a combination of an interactive slide show and a martini glass.

There are 4 scenes, each corresponding to a single slide. The first three scenes provide an introduction to the topic and data. There is an opportunity in each slide to drill down via tooltips. The 4th scene allows the user to freely configure a chart and perform individual analysis.

Each scene has visual consistency, and generally follows the following format:
- Scene fills the entire screen. (Only during transitions are 2 scenes viewable at once)
- Title
- Contextual information
- Chart
- Analysis

The flow of each scene is from top to bottom. Scenes can be transitioned between using the navigation menu on the left and side, or by scrolling the mouse. This top to bottom flow also helps the user navigate the scenes, since transitioning to the next scene is simply a natural continuation of the direction they are currently moving.

Each chart in the narrative has a similar axes and visual queue indicating the passing of the Comprehensive Crime Control Act of 1984. That visual queue encourages users to focus on the trend of arrests since that point in time. It also serves as a way to connect data across scenes.

The chart is the biggest element of each scene, and naturally draws the users attention to it. Every chart also has a tooltip that follows the mouse, which encourages users to drill down into details for each year.

### Scenes
Each scene progressively adds more and more information to the data displayed, culminating in the final scene, which allows for free form exploration of the data.

#### Introduction [(link)](https://AlexanderJBauer.github.io/cs498narrative#intro)
This scene is purely informational and provides background on the "War on Drugs". It is structured like an article/blog and follows the same top to bottom flow as all of the other slides.

#### Drug related arrests since 1980 [(link)](https://AlexanderJBauer.github.io/cs498narrative#arrestsByYear)
This scene has a bar chart for the total number of arrests since 1980. The bars change color after the year 1984 as a visual queue to signify when the Comprehensive Crime Control Act was passed.

The tooltip is used to highlight the difference between the year being hovered on, and 1984.

The analysis provides commentary, and a brief summary of the increase in arrests since 1984.

#### Drug related arrests since 1980 by race [(link)](https://AlexanderJBauer.github.io/cs498narrative#arrestsByRace)
This scene has a chart with a line for each race category in the [FBI UCR](https://www.fbi.gov/services/cjis/ucr/publications) reports.

The tooltip is used to highlight the differences between the number of arrests for each race. The entries in the tooltip are ordered by number of arrests for consistency, and to highlight the comparison between races.

There is a black vertical line acting as a visual queue for the passing of the Comprehensive Crime Control Act.

#### Explore arrest data since 1980 [(link)](https://AlexanderJBauer.github.io/cs498narrative#explore)
This scene has a line chart that is completely configurable. The user can add a line for a combination of the following 3 categories:
- Offense (ie drug abuse violation)
- Race (ie Asian)
- Color (ie red, will act as color of the line)

To maintain visual consistency with other scenes, the form for adding lines was placed below the chart.
There is also a black vertical line on this chart serving the same purpose as it does in the 3rd scene.

The tooltip in this scene is the same as that in the 3rd scene.

## Annotations
Annotations in the scenes scene come from 3 places, the scene introduction, the tooltip, and the analysis after charts.

The scene introduction is used to give the reader context and explain what is being visualized. It is a combination of the title of each scene and the text presented before each chart.

The tooltips have the same background color and shape, keeping the look and feel consistent throughout scenes. They highlight information pertinent to the chart for the scene. This annotation was chosen because of its consistency across each chart.

The analysis provides a brief summary and commentary on each scene, and is used to support the message of the narrative. This annotation was chosen because the slide show is done in a blog-like fashion, where the general flow is top to bottom. Analysis and conclusions naturally belong at the end of such flows.

## Parameters

##### Slide number
The value of this parameter is visualized through the navigation bar on the left hand side. It is used to determine what scene is being displayed. It can be adjusted by scrolling the mouse or clicking on the navigation menu

##### Chart domain
The value of this parameter is visualized through the x-axis on each chart. The domain is dependent on the data presented on the chart. For this narrative the domain is consistent accross all charts, and corresponds to the years 1980-2018.

##### Chart range
The value of this parameter is dependent on the data presented on the chart. The upper end is equal to 103% of the maximum number of arrests, while the lower end is equal to 80% of the minimum number of arrests.

##### Mouse position
The mouse position determines how the tooltip is rendered.

##### Animation
This parameter is treated as a boolean for each chart. Only the bar chart in slide number 2 is animated. Once the chart has animated, it does not animate again.

##### Visible data
This parameter changes between scenes. The amount of visible data increases as the slide number increases.

Scene 1 has no visible data, while scene 2 and 3 have a set amount of visible data pertinent to the scene.

Scene 4 allows for the user to configure the visible data manually. This can be done via the form below the chart.

## Triggers

##### Slide change
A change in the slide number, will cause the visible data, and animation to change value.

##### Visible data change
When the visible data is updated, the chart range and domain will change along with the look and feel of teh tooltip.

In scene 4, the visible data can be changed interactively.

##### Mouse position change
When the mouse position is changed, it will effect the visibility, position, and content of the tooltip.

##### Animation execution
Once a chart has been animated, it will not animate again, even if moving between scenes.
