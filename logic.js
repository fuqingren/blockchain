/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.ModifyTranscript} modify - the trade to be processed
 * @transaction
 */

async function modifyTranscript(modify){
    const Assetregistry=await getAssetRegistry('org.fordham.Transcript');
    const factory=getFactory();
    const newasset=factory.newResource('org.fordham','Transcript',modify.mId);
    //modify aspects
    newasset.gpa=modify.gpa;
    newasset.remarks=modify.remarks;
    newasset.studentName=modify.studentName;
    newasset.studentId=modify.studentId;
    newasset.GraduationDate=modify.GraduationDate;
    newasset.issueDate=modify.issueDate;
  	newasset.createdSchool="Fordham University"
  
    newasset.school=modify.school; 
    newasset.student=factory.newRelationship('org.fordham','Student', getCurrentParticipant().getIdentifier());
    //newasset.student=StudentRef; 
  	const CompanyRef=factory.newRelationship('org.fordham','Company',getCurrentParticipant().getIdentifier());
    newasset.viewedBy=CompanyRef; 

  await Assetregistry.add(newasset);

}

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.fordham.Add_Remove_Company} change - the trade to be processed
 * @transaction
 */

async function modifyBy(change){
  //todo list student can add company that he wants to see in the list as well as  removing company
  // create an array?
  
  console.log('student changing company');
  const factory = getFactory();
  const add=change.student.company;
  
  await add.push(change.addCompany);
  
  
  const index=change.student.company.indexOf(change.removeCompany);
  if (index>-1){
    change.student.company.splice(index,1);
   }else  if (change.student.company !== change.newViewBy){
    throw new Error('Please delete the companies that are on the list')
  }
  
  
  
  
  const participantRegistry=await getParticipantRegistry('org.fordham.Student');
  await participantRegistry.update(change.student);
  
  const addEvent = factory.newEvent('org.fordham', 'Event_Add_Remove_Company');
  addEvent.xId = change.xId;
  addEvent.addCompany = change.addCompany;
  addEvent.removeCompany=change.removeCompany;
  addEvent.student=change.student;
  
  emit(addEvent);

}





