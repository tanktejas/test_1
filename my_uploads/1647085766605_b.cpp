#include <bits/stdc++.h>
using namespace std;
int main()
{
    string s;
    cin >> s;
    string str;
    fflush(stdin);
    getline(cin, str);
    map<char, int> m, msec;
    bool a = 1;
    int secondlen = str.length();
    int n = s.length();
    for (int i = 0; i < n; i++)
    {
        msec[s[i]]++;
        if (msec[s[i]] > 1)
        {

            a = 0;
        }
    }
    int spacecnt = 0;
    for (int i = 0; i < secondlen; i++)
    {

        if (str[i] == ' ')
        {
            spacecnt++;
        }
    }
    int i = 0;
    spacecnt += 2;
    string ans = "";
    char ch = str[str.length() - 1];
    bool lastvalid = 0;
    while (spacecnt-- and i < secondlen)
    {
        if (i < secondlen and str[i] == ' ')
        {
            ans += ' ';
            i++;
        }
        else
        {
            lastvalid = 0;
            map<char, int> mp;
            // cout << str[i];
            for (; i < secondlen and str[i] != ' '; i++)
            {
                if (str[i] >= 'A' and str[i] <= 'Z')
                {
                    str[i] += 32;
                }

                mp[str[i]]++;
            }
            string temp = "";
            for (int k = 0; k < n; k++)
            {
                char original = s[k];
                if (s[k] >= 'A' and s[k] <= 'Z')
                {
                    s[k] += 32;
                }

                while (mp[s[k]] > 0)
                {
                    temp += original;
                    mp[s[k]]--;
                    lastvalid = 1;
                }
            }
            ans += temp;
        }
    }
    // if (lastvalid and ch == ' ')
    // {
    //     ans += ' ';
    // }
    if (a == 0)
        cout << "New Language Error";
    else
        cout << ans;
    cout << endl;
}