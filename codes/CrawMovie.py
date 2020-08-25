import requests
from bs4 import BeautifulSoup

def cgv_find_id(city):
    for c in cgv[0]:
        if city == c[0]:
            return c[1]
    return None

def cgv_get_timetable(movie):
    tuples = []
    timetables = movie.select('div > div.type-hall > div.info-timetable > ul > li')
    for timetable in timetables:
        #print(type(timetable))
        #print(type(timetable.select_one('a > em')))
        #print(type(timetable.select_one('a > span')))
        if timetable.select_one('a > em') is not None:
            time = timetable.select_one('a > em').get_text()
            seat = timetable.select_one('a > span').get_text()
            num = movie.select_one('div > div.info-hall > ul > li:nth-child(2)').get_text().strip()
            tuple = (time, seat, num)
            tuples.append(tuple)
    return tuples

def craw_cgv(city, date, moviename = 'All'):
    '''
    input: '강남', '20200824'
    output: timetable of cgv
    '''
    theater = cgv_find_id(city)
    if not theater: return []
    cgv_url = "http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode="+theater+"&date="+date
    response = requests.get(cgv_url)
    html = response.text
    soup = BeautifulSoup(html)
    soup = BeautifulSoup(html,'html.parser')
    movies = soup.select('body > div > div.sect-showtimes > ul > li')
    cgv_tables = []
    for movie in movies:
        title = movie.select_one('div > div.info-movie > a > strong').get_text().strip()
        timetable = cgv_get_timetable(movie)
        cgv_tables.append([title, timetable])
    if moviename == 'All': return cgv_tables
    else:
        result = []
        for c in cgv_tables:
            if c[0] == moviename:
                result.append(c)
        return result[0][1]

# lottecinema

def loci_find_id(city):
    for l in loci[0]:
        if city == l[0]:
            return l[1]
    return None

def loci_get_movie_no_list(response):
    movie_no_list = []
    for item in response:
        movie_no = item["MovieCode"]
        if movie_no not in movie_no_list:
            movie_no_list.append(movie_no)
    return movie_no_list

def loci_get_time_table(movies):
    tuples = []
    for movie in movies:
        time = movie["StartTime"]
        seats = '잔여 '+ str(movie["BookingSeatCount"]) +'석'
        num = movie['ScreenNameKR']
        tuple = (time, seats, num)
        tuples.append(tuple)
    return tuples

def loci_split_movies_by_no(response):
    movie_no_list = loci_get_movie_no_list(response)
    table = []
    for movie_no in movie_no_list:
        movies = [item for item in response if item["MovieCode"] == movie_no]
        title = movies[0]["MovieNameKR"]
        timetable = loci_get_time_table(movies)
        table.append([title, timetable])
    return table

def craw_loci(city, date, movie ='All'):
    '''
    input: '강남', '20200824'
    output: timetable of lottecinema
    '''
    theater = loci_find_id(city)
    date = date[:4]+'-'+date[4:6]+'-'+date[6:]
    if not theater : return []
    loci_url = 'http://lottecinema.co.kr/LCWS/Ticketing/TicketingData.aspx'
    parameters =  {"MethodName":"GetPlaySequence",
               "channelType":"HO",
               "osType":"W",
               "osVersion":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36",
               "playDate": date, # 날짜
               "cinemaID": theater, # 상영관 id
               "representationMovieCode":""}

    response = requests.post(loci_url, data = {"paramList": str(parameters).encode()}).json()
    movies_response = response['PlaySeqs']['Items']
    if movie == 'All':
        return loci_split_movies_by_no(movies_response)
    else:
        temps = loci_split_movies_by_no(movies_response)
        loci_tables = []
        for temp in temps:
            if temp[0] == movie:
                loci_tables.append(temp)
        return loci_tables[0][1]


# megabox

def mega_find_id(city):
    for m in mega[0]:
        if city == m[0]:
            return m[1]
    return None

def mega_split_movies_by_no(response):
    movie_no_list = mega_get_movie_no_list(response)
    table = []
    for movie_no in movie_no_list:
        movies = [item for item in response if item["movieNo"] == movie_no]
        title = movies[0]["movieNm"]
        timetable = mega_get_time_table(movies)
        table.append([title, timetable])
    return table


def mega_get_movie_no_list(response):
    movie_no_list = []
    for item in response:
        movie_no = item["movieNo"]
        if movie_no not in movie_no_list:
            movie_no_list.append(movie_no)
    return movie_no_list


def mega_get_time_table(movies):
    tuples = []
    for movie in movies:
        time = movie["playStartTime"]
        seats = '잔여 '+str(movie["restSeatCnt"])+'석'
        num = movie['theabExpoNm']
        tuple = (time, seats, num)
        tuples.append(tuple)
    return tuples

def craw_mega(city, date, movie='All'):
    '''
    input: '강남', '2020-08-24'
    output: timetable of lottecinema
    '''
    theater = mega_find_id(city)
    if not theater: return []
    mega_url = "https://www.megabox.co.kr/on/oh/ohc/Brch/schedulePage.do"
    parameters = {"masterType":"brch",
              "detailType":"area",
              "brchNo":"1372",
              "firstAt":"N",
              "brchNo1":theater, # branch number: 강남
              "crtDe":"20200822",
              "playDe":date} # 상영 날짜
    response = requests.post(mega_url, data = parameters).json()
    movie_response = response['megaMap']['movieFormList']
    if movie == 'All':
        return mega_split_movies_by_no(movie_response)
    else:
        temps = mega_split_movies_by_no(movie_response)
        mega_tables = []
        for temp in temps:
            if temp[0] == movie:
                mega_tables.append(temp)
        return mega_tables[0][1]

# 영화 검색 함수
def check_available_movie(city, date, brand='All', movie='All'):
    if brand == 'cgv':
        return craw_cgv(city, date, movie)[0]
    elif brand == 'lottecinema':
        return craw_loci(city, date, movie)[0]
    elif brand == 'megabox':
        return craw_mega(city, date, movie)[0]
    elif brand =='All':
        return [['cgv'], [craw_cgv(city, date, movie)],
                ['lottecinema'], [craw_loci(city, date, movie)],
                ['megabox'], [craw_mega(city, date, movie)]]
    else:
        return "Brand name is wrong!"


'''
key = ''
while(key !='y'):
    print('Enter the city / date [yyyymmdd]')
    city,date = input().split()
    print('Enter the brand: you may not enter')
    brand = input()
    print('Enter the movie: you may not enter')
    movie = input()
    if len(brand)==0 and len(movie)==0: result = check_available_movie(city = city, date = date)
    elif len(movie)==0: result = check_available_movie(city = city, date = date, brand = brand)
    elif len(brand)==0: result = check_available_movie(city = city, date = date, movie = movie)
    else: result = check_available_movie(city = city, date = date, brand = brand, movie = movie)

    print()
    print("Here's the result! ")

    for re in result:
        print(re)
    # stop을 입력하면 종료됨
    print()
    print('Do you want to exit? (y/n)')
    key = input()
'''
