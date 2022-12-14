# Data source

I wanted to use the data from NASA's "POWER" project https://power.larc.nasa.gov/  
The dataset they use for meteorology is GMAO's "MERRA 2" https://disc.gsfc.nasa.gov/datasets/M2SDNXSLV_5.12.4/summary  
I used NASA's data's access protocol "OPeNDAP" to retrieved the data as URLs https://opendap.github.io/documentation/QuickStart.html  
I will base my explanation on this very last link (OPeNDAP quickstart guide), so be sure to check it out for further explanation.

# How does the URL work

After retrieving the data from MERRA 2 through OPeNDAP, I ended up with a list of URLs (one per day).  
Here is how one URL looks like (in this example, for the date 01/01/1980):  
https://goldsmr4.gesdisc.eosdis.nasa.gov/opendap/MERRA2/M2SDNXSLV.5.12.4/1980/01/MERRA2_100.statD_2d_slv_Nx.19800101.nc4  


This url doesn't work as it is, you have to add an extension (cf. OPeNDAP quickstart guide for other helpful extensions).  
Append ".dds" to look at the structure of the data.  
We can see the list of attributes, from "HOURNORAIN" to "time".  
Each attribute has one or several dimensions in brackets, for example HOURNORAIN has 3: time, lat and lon and the size of each of these dimensions is 1, 361 and 361.  
We can call several attributes "att1" and "att2" at a time, by appending "?att1,att2" to view the structure of only these attributes.  
Now, to access the response of the data, we'll use the extension ".ascii".  
For example, ".ascii?att1" shows the full response of att1.  
And to extract a part of the data, use the template "?att1[0][0][0]" with the correct number of dimensions.  

# Example to retrieve the data

Let's say we want the average temperature for Paris (still on the 01/01/1980).  
The attribute that contains the average temperature is T2MMEAN.  
It has 3 dimensions: time, lat and lon (NOT to be confused with lat and lon as their own attributes!!)  
For some reason, "time" only has one value (it's 0), so that's settled.  
To know what to put in "lat" and "lon", we have to retrieve the values in the ATTRIBUTES "lat" and "lon" (yes, they have the same name, yes this is confusing)  
A google search tells me that Paris's coordinates are 49 for lat and 2.5 for lon.  
Now, we need to know where these numbers are located in the attributes lat and lon.  
By showing the whole response of lat and lon (".ascii?lat,lon"), we can see that lat starts at -90 and increments by 0.5, and lon starts at -180 and increments by 0,625  
With a little bit of maths: lat[(49-(-90))/0.5] and lon[(2,5-(-180))/0.625] = lat[278] and lon[292], we found the location of the desired coordinates in the dataset.  
Indeed ".ascii?lat[278],lon[292]" returns 49 and 2.5  
Now that we know what location to look in, we can append ".ascii?T2MMEAN[0][278][292]" and learn that the average temperature in Paris on the 01/01/1980 was 272.177 Kelvin, so -1??C.  
Et voil?? !  