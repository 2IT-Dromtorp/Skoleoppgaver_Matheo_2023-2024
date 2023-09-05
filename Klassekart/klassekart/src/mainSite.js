import Button from './button'

export default function MainSite({oppdater}){
    return (
      <div className='Container-Parent'>
        <div className='Main-Divider'>
          <div className='Line'>
            <div className='Box'>
              <Button oppdater={oppdater} person="Andreas"/>
            </div>
            <div className='Box'>
            <Button oppdater={oppdater} person="Ahmad"/>
            </div>
            <div className='Box'>
                
              </div>
            </div>
            <div className='Line'>
              <div className='Box'>
              <Button oppdater={oppdater} person="Philip"/>
              </div>
              <div className='Box'>
              <Button oppdater={oppdater} person="Mattis"/>
              </div>
              <div className='Box'>
              
              </div>
            </div>
            <div className='Line'>
              <div className='Box'>
              <Button oppdater={oppdater} person="Gabriel"/>
              </div>
              <div className='Box'>
              
              </div>
              <div className='Box'>
              
              </div>
            </div>
          </div>
        <div className='Main-Divider'>
          <div className='Line'>
            <div className='Box'>
            <Button oppdater={oppdater} person="Theodor"/>
              </div>
              <div className='Box'>
              <Button oppdater={oppdater} person="Silas"/>
              </div>
              <div className='Box'>
              <Button oppdater={oppdater} person="Alva"/>
              </div>
            </div>
            <div className='Line'>
            <div className='Box'>
            <Button oppdater={oppdater} person="Axel"/>
              </div>
              <div className='Box'>
              <Button oppdater={oppdater} person="Vetle"/>
              </div>
              <div className='Box'>
              <Button oppdater={oppdater} person="Kristoffer"/>
              </div>
            </div>
            <div className='Line'>
            <div className='Box'>
            <Button oppdater={oppdater} person="Johannes"/>
            </div>
            <div className='Box'>
            <Button oppdater={oppdater} person="Elias"/>
            </div>
            <div className='Box'>
                <Button oppdater={oppdater} person="Matheo"/>
            </div>
          </div>
        </div>
      </div>  
    );
  };